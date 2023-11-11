import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import "./requiredMessage.scss";

interface RequiredMessage {
  showIcon?: boolean;
  fieldName: string;
  value: string | number | null | undefined;
}

const RequiredMessage = ({ fieldName, value, showIcon }: RequiredMessage) => {
  return !value ? (
    <div className="required-error-message">
      {showIcon && <ErrorOutlineIcon />}
      <span>{fieldName} is a required field</span>
    </div>
  ) : null;
};

export default RequiredMessage;
