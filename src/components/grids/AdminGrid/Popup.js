import React from "react";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";

export default function Popup({
  row,
  onChange,
  onApplyChanges,
  onCancelChanges,
  open,
}) {
  return (
    <Dialog
      open={open}
      onClose={onCancelChanges}
      aria-labelledby="form-dialog-title"
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle id="form-dialog-title">User Details</DialogTitle>
      <DialogContent>
        <FormGroup>
          <TextField
            margin="normal"
            name="username"
            label="Username"
            value={row.username || ""}
            onChange={onChange}
            required
            disabled={row.isNew ? false : true}
          />
          <TextField
            margin="normal"
            name="name"
            label="Name"
            value={row.name || ""}
            onChange={onChange}
          />
          <TextField
            type="email"
            margin="normal"
            name="email"
            label="Email"
            value={row.email || ""}
            onChange={onChange}
          />
          {row.isNew && (
            <TextField
              type="password"
              margin="normal"
              name="password"
              label="Password"
              value={row.password || ""}
              onChange={onChange}
              required
            />
          )}
          <FormControl margin="normal">
            <InputLabel id="right-label">Right</InputLabel>
            <Select
              name="isSuperAdmin"
              labelId="right-label"
              value={row.isSuperAdmin ? true : false}
              onChange={onChange}
            >
              <MenuItem value={false} selected>
                Admin
              </MenuItem>
              <MenuItem value={true}>Super Admin</MenuItem>
            </Select>
          </FormControl>
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancelChanges} color="primary">
          Cancel
        </Button>
        <Button onClick={onApplyChanges} color="primary" type="submit">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
