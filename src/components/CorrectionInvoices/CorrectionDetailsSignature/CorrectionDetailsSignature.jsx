import {memo} from 'react'
import "./CorrectionDetailsSignature.css"

 const CorrectionDetailsSignature = memo(
   ({ originalInvoiceData, correctedHeader }) => {
     return (
       <div className="correctionDetails__sygnature">
         <div className="sygnature__buyer">
           <div>
             {correctedHeader?.correctedBuyer?.name || "Brak nazwy nabywcy"}
           </div>
           <div>Podpis osobu upoważnionej do odbioru faktury</div>
         </div>
         <div className="sygnature__seller">
           <div>
             {originalInvoiceData?.seller?.name || "Brak nazwy sprzedawcy"}
           </div>
           <div>Podpis osobu upoważnionej do wystawienia faktury</div>
         </div>
       </div>
     );
   }
 );

export default CorrectionDetailsSignature