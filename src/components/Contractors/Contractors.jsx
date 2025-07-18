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
    editingItemId,
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
    //functions
    handlePageChange,
    openConfirmModal,
    closeConfirmModal,
    handleContractorSubmit,
    // handleContractorIsEdit,
    handleContractorEdit,
    handleContractorDelete,
    handleEditInitiated,
    handleCancelEdit,
  } = useContractorsManagement();

  return (
    <div className="contactors">
      {errorFirestore && <ValidationError text={errorFirestore} />}
      <div className="contactors__header">
        <AddContractor
          isEdit={editingItemId !== null}
          state={state}
          setState={setState}
          onContractorEdit={(e) => handleContractorEdit(e)}
          onContractorSubmit={handleContractorSubmit}
          test={test}
          setTest={setTest}
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
                onEdit={handleEditInitiated}
                onDelete={() => openConfirmModal(item.id, item.data.contractor)}
                onCancelEdit={handleCancelEdit}
                isEdit={editingItemId === item.id}
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
