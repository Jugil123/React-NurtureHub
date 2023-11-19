import { useCallback } from "react";
import "./UserType.css";

const UserType = () => {
  const navigate = useNavigate();
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  return (
    <div className="usertype">
      <div className="are-you-caregiver">Are you Caregiver or Recipient?</div>
      <img
        className="vector-icon"
        alt=""
        src="/vector.svg"
        onClick={onVectorClick}
      />
      <div className="button-container" onClick={onGroupContainerClick}>
      <button className="button-container">
        <div className="button">Caregiver</div>
      </button>
    </div>
    <div className="button-container" onClick={onGroupContainerClick}></div>
      <button className="button-container">
        <div className="button">Recipient</div>
      </button>
    </div>
  );
};

export default UserType;