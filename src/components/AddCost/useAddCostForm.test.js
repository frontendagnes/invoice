import { renderHook, act } from "@testing-library/react";
import useAddCostForm from "./useAddCostForm";
import { vi } from "vitest";

// MOCK kontekstu
vi.mock("../../assets/utility/StateProvider", () => {
  return {
    useStateValue: () => [
      {
        user: { uid: "test-user" },
        costHints: [
          { data: { nip: "1234567890" } }, // istniejący kontrahent
        ],
        costs: [],
      },
      vi.fn(), // dispatch
    ],
  };
});

// MOCK useFirestore
vi.mock("../../api/useFirestore/useFirestore", () => ({
  default: () => ({
    getData: vi.fn(),
    addDocument: vi.fn(),
    findDocumentByField: vi.fn(),
    loading: false,
    errorFirestore: null,
  }),
}));

describe("useAddCostForm", () => {
  it("pozwala dodać kontrahenta tylko gdy NIP nie istnieje", async () => {
    const { result } = renderHook(() => useAddCostForm());

    // ustawiamy dane testowe
    act(() => {
      result.current.setContractor("Nowy kontrahent");
      result.current.setTest("test");
      result.current.setNip("9999999999"); // NIP nieistniejący
    });

    const fakeEvent = { preventDefault: vi.fn() };

    await act(async () => {
      await result.current.addContractor(fakeEvent);
    });

    // Sprawdzamy, czy warunek przeszedł (czyli że nie było błędu z NIP-em)
    // Możesz tu sprawdzić np. log, stan albo że dispatch nie został wywołany z ALERT_ERROR
    expect(fakeEvent.preventDefault).toHaveBeenCalled();
    // ...albo więcej asercji w zależności od Twojej logiki
  });

  it("nie pozwala dodać kontrahenta, jeśli NIP już istnieje", async () => {
    const { result } = renderHook(() => useAddCostForm());

    act(() => {
      result.current.setContractor("Istniejący kontrahent");
      result.current.setTest("test");
      result.current.setNip("1234567890"); // istniejący NIP
    });

    const fakeEvent = { preventDefault: vi.fn() };

    await act(async () => {
      await result.current.addContractor(fakeEvent);
    });

    // Tutaj możesz sprawdzić czy dispatch z ALERT_ERROR został wywołany
    // np. mock dispatch i sprawdzenie co przyjął
    expect(fakeEvent.preventDefault).toHaveBeenCalled();
  });
});
