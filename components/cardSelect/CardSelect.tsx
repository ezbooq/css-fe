import { type Option } from "@/types/common";
import SelectCard from "./SelectCard";

type CardSelectProps = {
  cardData: Option[];
  isDisabled?: boolean;
  selectedCard?: string;
  setSelectedCard?: (id: string) => void;
};

export default function CardSelect({
  cardData,
  isDisabled,
  selectedCard,
  setSelectedCard,
}: CardSelectProps) {
  const handleCardClick = (id: string) => {
    if (!isDisabled && setSelectedCard) {
      setSelectedCard(id);
    }
  };

  return (
    <div>
      <div className="flex gap-5">
        {cardData?.map((item) => (
          <SelectCard
            key={item.id}
            name={item.name}
            icon={item.image}
            isSelected={selectedCard === item.id}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
