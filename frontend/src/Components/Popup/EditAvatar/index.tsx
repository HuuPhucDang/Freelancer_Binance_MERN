import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Avatar,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
} from '@mui/material';

interface IProps {
  open: boolean;
  onClose(): void;
}

const EditName: React.FC<IProps> = ({ open = false, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs">
      <DialogTitle sx={{ color: 'text.primary' }}>
        Chỉnh sửa ảnh đại diện
      </DialogTitle>
      <DialogContent>
        <FormControl sx={{ marginTop: '10px' }}>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="A"
            name="radio-buttons-group"
          >
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControlLabel
                  value="A"
                  control={<Radio />}
                  label={<Avatar sx={{ width: 60, height: 60 }}>A</Avatar>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="B"
                  control={<Radio />}
                  label={<Avatar sx={{ width: 60, height: 60 }}>B</Avatar>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="C"
                  control={<Radio />}
                  label={<Avatar sx={{ width: 60, height: 60 }}>C</Avatar>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="D"
                  control={<Radio />}
                  label={<Avatar sx={{ width: 60, height: 60 }}>D</Avatar>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="E"
                  control={<Radio />}
                  label={<Avatar sx={{ width: 60, height: 60 }}>E</Avatar>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="F"
                  control={<Radio />}
                  label={<Avatar sx={{ width: 60, height: 60 }}>F</Avatar>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="G"
                  control={<Radio />}
                  label={<Avatar sx={{ width: 60, height: 60 }}>G</Avatar>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="H"
                  control={<Radio />}
                  label={<Avatar sx={{ width: 60, height: 60 }}>H</Avatar>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="I"
                  control={<Radio />}
                  label={<Avatar sx={{ width: 60, height: 60 }}>I</Avatar>}
                />
              </Grid>
              <Grid item xs={6}>
                <FormControlLabel
                  value="J"
                  control={<Radio />}
                  label={<Avatar sx={{ width: 60, height: 60 }}>J</Avatar>}
                />
              </Grid>
            </Grid>
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button sx={{ textTransform: 'unset' }} onClick={onClose} color="error">
          Hủy
        </Button>
        <Button
          sx={{
            textTransform: 'unset',
            backgroundColor: 'background.burntSienna',
          }}
          variant="contained"
          onClick={onClose}
        >
          Lưu
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditName;
