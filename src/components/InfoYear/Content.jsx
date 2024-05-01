const Content = ({ text, handleClick, handleClickNo, buttonYesTxt }) => {
  return (
    <div className="infoyear__content">
      <div className="infoyear__content--text">{text}</div>
      <div className="infoyear__content--buttons">
        <button
          type="button"
          onClick={handleClickNo}
          className="infoyear__buttonNo"
        >
          Ignoruj
        </button>
        <button
          type="button"
          onClick={handleClick}
          className="infoyear__buttonYes"
        >
          {buttonYesTxt}
        </button>
      </div>
    </div>
  );
};

export default Content;
