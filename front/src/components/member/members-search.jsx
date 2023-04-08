import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
import { InputAdornment, OutlinedInput, SvgIcon } from "@mui/material";

export const MembersSearch = (props) => {
  const { onChange } = props;

  return (
    <OutlinedInput
      defaultValue=""
      fullWidth
      placeholder="Search member"
      startAdornment={
        <InputAdornment position="start">
          <SvgIcon color="action" fontSize="small">
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      }
      sx={{ maxWidth: 400, height: 40 }}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
