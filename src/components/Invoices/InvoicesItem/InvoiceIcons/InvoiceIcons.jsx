import { useMediaQuery } from "@mui/material";
// mui icons
import VisibilityIcon from "@mui/icons-material/Visibility";
import ConstructionIcon from "@mui/icons-material/Construction";
import EditNoteIcon from "@mui/icons-material/EditNote";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
// components
import InvoiceIconsMobile from "./InvoiceIconsMobile.jsx";
import InvoiceIconsDesktop from "./InvoiceIconsDesktop.jsx";

const InvoiceIcons = ({
  onPreview,
  onEditNote,
  onDelete,
  onCorrection,
  refNoteButton,
  refSettingsButton,
}) => {
  const isMobile = useMediaQuery("(max-width: 800px)");

  const iconActions = [
    {
      key: "preview",
      label: "Podgląd faktury",
      IconComponent: VisibilityIcon,
      color: "success",
      onClick: onPreview,
      showOutside: true,
      ref: null,
    },
    {
      key: "note",
      label: "Dodaj/Edytuj notatkę",
      IconComponent: EditNoteIcon,
      color: "primary",
      colorDesktop: "inherit", // domyślny kolor dla desktop
      onClick: onEditNote,
      ref: refNoteButton,
    },

    {
      key: "correction",
      label: "Faktury korygujące",
      IconComponent: ConstructionIcon,
      color: "action",
      colorDesktop: "inherit", // domyślny kolor dla desktop
      onClick: onCorrection,
      ref: refSettingsButton,
    },
    {
      key: "delete",
      label: "Usuń fakturę",
      IconComponent: RemoveCircleIcon,
      color: "error",
      onClick: onDelete,
      danger: true,
      ref: null,
    },
  ];

  const renderIcon = (action, variant = "desktop") => {
    const { IconComponent, color, colorDesktop } = action;
    const iconColor =
      variant === "desktop" && colorDesktop ? colorDesktop : color;

    return <IconComponent color={iconColor} fontSize="medium" />;
  };

  if (isMobile) {
    return (
      <InvoiceIconsMobile iconActions={iconActions} renderIcon={renderIcon} />
    );
  }

  return (
    <InvoiceIconsDesktop iconActions={iconActions} renderIcon={renderIcon} />
  );
};

export default InvoiceIcons;
