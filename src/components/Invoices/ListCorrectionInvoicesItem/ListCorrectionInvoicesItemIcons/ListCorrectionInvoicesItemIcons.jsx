import "./ListCorrectionInvoicesItemIcons.css";
import { useMediaQuery } from "@mui/material";

//mui
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import VisibilityIcon from "@mui/icons-material/Visibility";

//components
import IconsMobile from "./IconsMobile.jsx";
import IconsDesktop from "./IconsDestop.jsx";

function ListCorrectionInvoicesItemIcons({
  deleteCorrection,
  openCorrectionDetails,
}) {
  const isMobile = useMediaQuery("(max-width: 800px)");
  const iconActions = [
    {
      key: "preview",
      label: "Podgląd korekty",
      color: "inherit",
      onClick: openCorrectionDetails,
      IconComponent: VisibilityIcon,
    },
    {
      key: "delete",
      label: "Usuń korektę",
      color: "error",
      onClick: deleteCorrection,
      IconComponent: RemoveCircleIcon,
      danger: true,
    },
  ];

  const renderIcon = (action) => {
    const { IconComponent, color } = action;
    return <IconComponent color={color} fontSize="medium" />;
  };

  if (isMobile)
    return <IconsMobile iconActions={iconActions} renderIcon={renderIcon} />;
  return <IconsDesktop iconActions={iconActions} renderIcon={renderIcon} />;
}

export default ListCorrectionInvoicesItemIcons;
