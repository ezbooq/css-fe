"use client";

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import InputBox from "../inputbox/InputBox";
import TextArea from "../textArea/TextArea";
import Button from "../button/Button";
import SearchOptionSelect from "../searchOptionSelect/SearchOptionSelect";
import { getQuestions } from "@/services/questions/questions";
import { type Option } from "@/types/common";
import { CheckOutContext } from "@/hooks/CheckOutContext";
import { CheckOutFormContext } from "@/hooks/CheckOutFormContext";

export default function AddressDetails() {
  const rawParams = useParams();
  const { selectedTabIndex, setSelectedTabIndex } = useContext(CheckOutContext);
  const { setCheckOutForm, checkOutForm } = useContext(CheckOutFormContext);
  const selectedServiceMode = checkOutForm.generalDetails.serviceMode;
  const businessCode = Array.isArray(rawParams.businessCode)
    ? rawParams.businessCode[0]
    : rawParams.businessCode;

  const companyCode = Array.isArray(rawParams.companyCode)
    ? rawParams.companyCode[0]
    : rawParams.companyCode;

  const questions = useQuery({
    queryKey: ["questions", { businessCode, companyCode }],
    queryFn: getQuestions,
    enabled:
      typeof businessCode === "string" &&
      !!businessCode &&
      typeof companyCode === "string" &&
      !!companyCode,
  });

  const schema = React.useMemo(() => {
    const buildQuestionSchema = (
      data: typeof questions.data,
      selectedServiceMode: number
    ) => {
      const shape: Record<string, any> = {
        note: z.string().optional(),
      };

      if (selectedServiceMode === 2) {
        shape.address = z.string().min(1, "Address is required");
        shape.apartmentNo = z.string().optional();
        shape.city = z.string().min(1, "City is required");
        shape.state = z.string().min(1, "State is required");
        shape.zipCode = z.string().min(1, "Zip code is required");
      } else {
        // still include fields to avoid uncontrolled input issues, but mark as optional
        shape.address = z.string().optional();
        shape.apartmentNo = z.string().optional();
        shape.city = z.string().optional();
        shape.state = z.string().optional();
        shape.zipCode = z.string().optional();
      }

      if (data) {
        data.singleQuestions.forEach((q) => {
          shape[`q_${q.id}`] = z.string().min(1, "Required");
        });

        data.multipleQuestions.forEach((q) => {
          shape[`q_${q.id}`] = z.string().min(1, "Required");
        });
      }

      return z.object(shape);
    };
    return buildQuestionSchema(questions.data, selectedServiceMode);
  }, [questions.data, selectedServiceMode]);

  type FieldTypes = z.infer<typeof schema>;

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FieldTypes>({
    resolver: zodResolver(schema),
    defaultValues: {
      address: checkOutForm.addressDetails?.address || "",
      apartmentNo: checkOutForm.addressDetails?.apartmentNumber || "",
      city: checkOutForm.addressDetails?.city || "",
      state: checkOutForm.addressDetails?.state || "",
      zipCode: checkOutForm.addressDetails?.zipCode || "",
      note: checkOutForm.addressDetails?.note || "",
      ...(questions.data
        ? {
            ...questions.data.singleQuestions.reduce((acc, q) => {
              acc[`q_${q.id}`] =
                checkOutForm.questionAnswers?.[`q_${q.id}`] || "";
              return acc;
            }, {} as Record<string, string>),
            ...questions.data.multipleQuestions.reduce((acc, q) => {
              acc[`q_${q.id}`] =
                checkOutForm.questionAnswers?.[`q_${q.id}`] || "";
              return acc;
            }, {} as Record<string, string>),
          }
        : {}),
    },
  });

  const [selectedOptions, setSelectedOptions] = React.useState<
    Record<string, Option | undefined>
  >({});

  React.useEffect(() => {
    if (questions.data) {
      const defaultOptions: Record<string, Option | undefined> = {};
      questions.data.multipleQuestions.forEach((q) => {
        defaultOptions[q.id] = undefined;
      });
      setSelectedOptions(defaultOptions);
    }
  }, [questions.data]);

  const handleOptionSelect = (qId: string, option: Option | undefined) => {
    setSelectedOptions((prev) => ({ ...prev, [qId]: option }));
    setValue(`q_${qId}`, option ? option.id : "", { shouldValidate: true });
  };

  const onSubmit = (data: FieldTypes) => {
    const questionAnswers = Object.keys(data)
      .filter((key) => key.startsWith("q_"))
      .reduce((acc, key) => {
        acc[key] = data[key] || "";
        return acc;
      }, {} as Record<string, string>);

    setCheckOutForm({
      ...checkOutForm,
      addressDetails: {
        address: data.address || "",
        apartmentNumber: data.apartmentNo || "",
        city: data.city || "",
        state: data.state || "",
        zipCode: data.zipCode || "",
        note: data.note || "",
      },
      questionAnswers, // ✅ save dynamic answers here
    });

    setSelectedTabIndex(selectedTabIndex + 1);
  };
  React.useEffect(() => {
    if (questions.data) {
      const defaultOptions: Record<string, Option | undefined> = {};
      questions.data.multipleQuestions.forEach((q) => {
        const selectedId = checkOutForm.questionAnswers?.[`q_${q.id}`];
        const foundOption = q.options?.find((opt) => opt.id === selectedId);
        defaultOptions[q.id] = foundOption
          ? { id: foundOption.id, name: foundOption.name }
          : undefined;
      });
      setSelectedOptions(defaultOptions);
    }
  }, [questions.data, checkOutForm.questionAnswers]);
  if (!questions.data) return null;
  console.log(checkOutForm);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {selectedServiceMode === 2 && (
        <div className="border-b-2 border-light-base-light py-8">
          <h1 className="font-medium text-lg">Address Details</h1>
          <div className="grid grid-cols-2 gap-5 mt-3">
            <InputBox
              name="address"
              register={register}
              placeholder="address"
              label="Address"
              customStyle="bg-transparent"
              error={(errors as any)[`address`]?.message}
            />
            <InputBox
              name="apartmentNo"
              register={register}
              placeholder="Apt.no"
              label="Apt.no"
              customStyle="bg-transparent"
              error={(errors as any)[`apartmentNo`]?.message}
            />
          </div>
          <div className="grid grid-cols-3 gap-5 mt-5">
            <InputBox
              name="city"
              register={register}
              placeholder="city"
              label="City"
              customStyle="bg-transparent"
              error={(errors as any)[`city`]?.message}
            />
            <InputBox
              name="state"
              register={register}
              placeholder="state"
              label="State"
              customStyle="bg-transparent"
              error={(errors as any)[`state`]?.message}
            />
            <InputBox
              name="zipCode"
              register={register}
              placeholder="zipCode/postalCode"
              label="ZipCode/PostalCode"
              customStyle="bg-transparent"
              error={(errors as any)[`zipCode`]?.message}
            />
          </div>
        </div>
      )}

      <div className="border-b-2 border-light-base-light py-8">
        <h1 className="font-medium text-lg mb-5">
          Special Notes or Recommendation
        </h1>
        <TextArea
          label="Would You Like To Add Any Notes?"
          register={register}
          name="note"
          placeholder="Add note"
          rows={5}
          customStyle="bg-transparent"
          error={(errors as any)[`note`]?.message}
        />
      </div>

      {(questions.data.multipleQuestions.length > 0 ||
        questions.data.singleQuestions.length > 0) && (
        <div className="border-b-2 border-light-base-light py-8">
          <h1 className="font-medium text-lg mb-5">Tell Us More</h1>
          <div className="grid grid-cols-2 gap-x-5">
            {questions.data.multipleQuestions.map((q) => {
              const options =
                q.options?.map((opt) => ({ id: opt.id, name: opt.name })) || [];
              const selected = selectedOptions[q.id];

              return (
                <div key={q.id} className="mb-4">
                  <label className="block text-sm mb-1">{q.question}</label>
                  <SearchOptionSelect
                    handleSelected={(option) =>
                      handleOptionSelect(q.id, option)
                    }
                    options={options}
                    selected={selected}
                    setSelected={(option) => handleOptionSelect(q.id, option)}
                    error={(errors as any)[`q_${q.id}`]?.message}
                  />
                </div>
              );
            })}
          </div>

          {questions.data.singleQuestions.map((q) => (
            <div key={q.id} className="mb-4">
              <InputBox
                name={`q_${q.id}`}
                register={register}
                placeholder={q.question}
                label={q.question}
                customStyle="bg-transparent"
                error={(errors as any)[`q_${q.id}`]?.message}
              />
            </div>
          ))}
        </div>
      )}

      <div className="w-full flex gap-5">
        <div className="w-1/3">
          <Button
            colour="light"
            fullWidth
            type="button"
            onClick={() => setSelectedTabIndex(selectedTabIndex - 1)}
          >
            Back
          </Button>
        </div>
        <div className="w-2/3">
          <Button colour="dark" fullWidth type="submit">
            Next
          </Button>
        </div>
      </div>
    </form>
  );
}
