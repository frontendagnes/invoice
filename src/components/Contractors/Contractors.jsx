import "./Contractors.css";
import { useContractorsManagement } from "./useContractorsManagement";

//components
import Contractor from "./Contractor/Contractor";
import AddContractor from "./AddContractor/AddContractor";
import ValidationError from "../ValidationError/ValidationError";
import PaginationUX from "../PaginationUX/PaginationUX";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import SearchContractors from "./SearchContracotrs/SearchContractors";

function Contractors() {
  const {
    //state
    errorFirestore,
    errors,
    isModalOpen,
    itemToDeleteName,
    searchContractors,
    setSearchContractors,
    state,
    setState,
    filteredAndSortedContractors,
    currentPage,
    currentPageData,
    totalPages,
    test,
    setTest,
    setErrors,
    //functions
    handlePageChange,
    openConfirmModal,
    closeConfirmModal,
    handleContractorSubmit,
    handleContractorDelete,
  } = useContractorsManagement();

  return (
    <div className="contactors">
      <div className="contracros__errors">
        {errorFirestore && <ValidationError text={errorFirestore} />}
        {errors.test && <ValidationError text={errors.test} />}
      </div>
      <div className="contactors__header">
        <AddContractor
          state={state}
          setState={setState}
          onContractorSubmit={handleContractorSubmit}
          test={test}
          setTest={setTest}
          errors={errors}
          setErrors={setErrors}
        />
      </div>
      <div className="contracotrs__list">
        <h2 className="contractor__list--name">Lista Kontrahentów</h2>
        <SearchContractors
          search={searchContractors}
          setSearch={setSearchContractors}
        />
        <ul className="contractors__list--container">
          {filteredAndSortedContractors ? (
            currentPageData.map((item) => (
              <Contractor
                key={item.id}
                item={item}
                onDelete={() => openConfirmModal(item.id, item.data.contractor)}
              />
            ))
          ) : (
            <ValidationError text="Brak kontrachentów" />
          )}
        </ul>
        <PaginationUX
          totalPages={totalPages}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        />
      </div>
      {isModalOpen && (
        <DeleteConfirmationModal
          isOpen={isModalOpen}
          onClickYes={handleContractorDelete}
          onClickNo={closeConfirmModal}
          item={itemToDeleteName}
        />
      )}
    </div>
  );
}

export default Contractors;
