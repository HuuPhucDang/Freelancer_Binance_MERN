import React from 'react';
import {
  InputLabel,
  Stack,
  SxProps,
  Theme,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ReactSelect, { SingleValue } from 'react-select';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

interface IOption {
  label: string;
  value: string;
}

interface IProps {
  label?: string;
  selected: string;
  options: IOption[];
  onSelect(newValue: string): void;
  sx?: object;
  placeholder?: string;
}

const labelStyles: SxProps<Theme> = {
  fontSize: {
    xs: '12px',
    md: '18px',
  },
  fontWeight: 700,
  letterSpacing: '-1.5%',
  color: 'rgba(0,0,0,0.8)',
  marginRight: {
    md: '16px',
  },
  marginBottom: {
    xs: '16px',
    md: '0px',
  },
};

const Select: React.FC<IProps> = ({
  selected,
  options,
  onSelect,
  label = '',
  sx = {},
  placeholder = '',
}) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const [selectedOption, setSelectedOption] = React.useState<IOption | null>(
    null
  );

  React.useEffect(() => {
    const findOption = options.find(
      (option: IOption) => option.value === selected
    );
    if (findOption) setSelectedOption(findOption);
  }, [selected]);

  const handleChange = (newValue: SingleValue<IOption>) => {
    if (newValue && onSelect) onSelect(newValue.value);
  };

  return (
    <Stack
      direction={{
        xs: 'column',
        md: 'row',
      }}
      alignItems={{
        xs: 'start',
        md: 'center',
      }}
      sx={sx}
    >
      {label ? <InputLabel sx={labelStyles}>{label}</InputLabel> : null}
      <ReactSelect
        value={selectedOption}
        onChange={handleChange}
        options={options}
        placeholder={placeholder || 'Country'}
        styles={{
          container: (base) => ({
            ...base,
            width: matchUpMd ? '212px' : '204px',
            boxSizing: 'border-box',
            fontSize: matchUpMd ? '16px' : '14px',
            fontWeight: 500,
          }),
          control: (base, props) => ({
            ...base,
            borderRadius: '12px',
            boxSizing: 'border-box',
            borderColor: '#2E2800',
            boxShadow: props.isFocused ? '0 0 0 1px #FFDD00' : 'none',
          }),
          valueContainer: (base) => ({
            ...base,
            borderRadius: '12px',
            boxSizing: 'border-box',
            height: matchUpMd ? '56px' : '48px',
            padding: matchUpMd ? '0 16px' : '0 12px',
          }),
          menuList: (base) => ({
            ...base,
            border: '1px solid #2E2800',
            width: 'auto',
            height: '100%',
            borderRadius: '12px',
            maxHeight: '400px',
          }),
          menu: (base) => ({
            ...base,
            minWidth: '100%',
            width: 'auto',
            borderRadius: '12px',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }),
          option: (base, props) => ({
            ...base,
            width: '100%',
            whiteSpace: matchUpMd ? 'nowrap' : 'unset',
            backgroundColor: props.isSelected
              ? 'rgba(255, 221, 0, 1.0)'
              : 'white',
            color: '#000000',
            ':active': {
              backgroundColor: 'rgba(255, 221, 0, 1.0)',
            },
            ':hover': {
              backgroundColor: 'rgba(255, 221, 0, 0.5)',
            },
          }),
        }}
        components={{
          IndicatorSeparator: () => null,
          DropdownIndicator: () => (
            <ExpandMoreOutlinedIcon sx={{ margin: '0 14px 0 8px' }} />
          ),
        }}
      />
    </Stack>
  );
};

export default Select;
