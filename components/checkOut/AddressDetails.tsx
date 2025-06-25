import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import InputBox from "../inputbox/InputBox";
import TextArea from "../textArea/TextArea";
import { type Question } from "@/types/question";
import { type Option } from "@/types/common";
import SearchOptionSelect from "../searchOptionSelect/SearchOptionSelect";
import Button from "../button/Button";
const questionData = {
  singleQuestions: [
    {
      id: "1",
      question: "What is the make of your car?",
      type: "Single",
    },
    {
      id: "2",
      question: "What is the model of your car?",
      type: "Single",
    },
    {
      id: "3",
      question: "What is the year of manufacture?",
      type: "Single",
    },
  ],
  multipleQuestions: [
    {
      id: "4",
      question: "What type of service does your car need?",
      type: "Multiple",
      options: [
        { id: "oil_change", name: "Oil Change" },
        { id: "tire_rotation", name: "Tire Rotation" },
        { id: "brake_inspection", name: "Brake Inspection" },
        { id: "battery_check", name: "Battery Check" },
        { id: "engine_tuneup", name: "Engine Tune-up" },
      ],
    },
    {
      id: "5",
      question: "Do you need a loaner car while your vehicle is serviced?",
      type: "Multiple",
      options: [
        { id: "yes", name: "Yes" },
        { id: "no", name: "No" },
      ],
    },
    {
      id: "6",
      question: "When was your last car service?",
      type: "Multiple",
      options: [
        { id: "less_3_months", name: "Less than 3 months ago" },
        { id: "3_6_months", name: "3-6 months ago" },
        { id: "more_6_months", name: "More than 6 months ago" },
      ],
    },
    {
      id: "7",
      question: "Are there any specific issues you want us to check?",
      type: "Multiple",
      options: [
        { id: "strange_noises", name: "Strange Noises" },
        { id: "warning_lights", name: "Warning Lights" },
        { id: "fluid_leaks", name: "Fluid Leaks" },
        { id: "performance_issues", name: "Performance Issues" },
      ],
    },
  ] as Question[],
};

const buildQuestionSchema = (data: typeof questionData) => {
  const shape: Record<string, any> = {
    address: z.string().min(1, "Address is required"),
    apartmentNo: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "Zip code is required"),
    note: z.string().optional(),
  };

  data.singleQuestions.forEach((q) => {
    shape[`q_${q.id}`] = z.string().min(1, "Required");
  });

  data.multipleQuestions.forEach((q) => {
    shape[`q_${q.id}`] = z.union([
      z.string().min(1, "Required"),
      z.array(z.string()).min(1, "Select at least one option"),
    ]);
  });

  return z.object(shape);
};

const schema = buildQuestionSchema(questionData);

type FieldTypes = z.infer<typeof schema>;
export default function AddressDetails() {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FieldTypes>({
    resolver: zodResolver(schema),
  });
  const [selectedOptions, setSelectedOptions] = React.useState<
    Record<string, Option | undefined>
  >({});

  const handleOptionSelect = (qId: string, option: Option | undefined) => {
    setSelectedOptions((prev) => ({ ...prev, [qId]: option }));
    setValue(`q_${qId}`, option ? option.id : "", { shouldValidate: true });
  };
  const handler = (data: FieldTypes) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(handler)}>
      <div className="border-b-2 border-light-base-light py-8">
        <h1 className="font-medium text-lg">Address Details</h1>
        <div className="grid grid-cols-2 gap-5 mt-3">
          <div>
            <InputBox
              name="address"
              register={register}
              placeholder="address"
              label="Address"
              customStyle="bg-transparent"
              error={(errors as any)[`address`]?.message}
            />
          </div>
          <div>
            <InputBox
              name="apartmentNo"
              register={register}
              placeholder="Apt.no"
              label="Apt.no"
              customStyle="bg-transparent"
              error={(errors as any)[`apartmentNo`]?.message}
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-5 mt-5">
          <div>
            <InputBox
              name="city"
              register={register}
              placeholder="city"
              label="City"
              customStyle="bg-transparent"
              error={(errors as any)[`city`]?.message}
            />
          </div>
          <div>
            <InputBox
              name="state"
              register={register}
              placeholder="state"
              label="State"
              customStyle="bg-transparent"
              error={(errors as any)[`state`]?.message}
            />
          </div>
          <div>
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
      </div>
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
      <div className="border-b-2 border-light-base-light py-8">
        <h1 className="font-medium text-lg mb-5">Tell Us More</h1>
        <div className="grid grid-cols-2 gap-x-5">
          {questionData.multipleQuestions.map((q) => {
            const options =
              q.options?.map((opt) => ({ id: opt.id, name: opt.name })) || [];
            const selected = selectedOptions[q.id];

            return (
              <div key={q.id} className="mb-4">
                <label className="block text-sm  mb-1">{q.question}</label>
                <SearchOptionSelect
                  handleSelected={(option) => handleOptionSelect(q.id, option)}
                  options={options}
                  selected={selected}
                  setSelected={(option) => handleOptionSelect(q.id, option)}
                  error={(errors as any)[`q_${q.id}`]?.message}
                />
              </div>
            );
          })}
        </div>

        {questionData.singleQuestions.map((q) => (
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

      <div className="w-full">
        <Button colour="dark" fullWidth type="submit">
          Next
        </Button>
      </div>
    </form>
  );
}
