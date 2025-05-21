import { NumericFormat } from "react-number-format";
function DisplayingNumber(props) {
  const { value, renderText } = props;
  return (
    <>
      <NumericFormat
        decimalScale={2}
        fixedDecimalScale={true}
        displayType="text"
        thousandSeparator={true}
        value={value}
        renderText={renderText}
      />
    </>
  );
}

export default DisplayingNumber;
