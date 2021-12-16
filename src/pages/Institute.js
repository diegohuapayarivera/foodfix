import {
  Button,
  ButtonGroup,
  Fab,
  Grid,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Form from "../components/Form";
import TableC from "../components/Table";
import SendIcon from "@mui/icons-material/Send";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableCell } from "@mui/material";

const listInstitute = [
  { id: 1, name: "Valle Grande" },
  { id: 2, name: "Condoray" },
  { id: 3, name: "Telesup" },
  { id: 4, name: "Taylor" },
  { id: 5, name: "Senati" },
  { id: 6, name: "San Jose" },
];

export const Institute = () => {
  const handlerClick = (row) => {
    console.log(row);
    alert("Click");
  };
  return (
    <>
      <Form title="Instituto">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField label="Instituto" />
          </Grid>
          
          <Grid item xs={12}>
            <Button variant="contained">
              <SendIcon />
              {"Enviar"}
            </Button>
          </Grid>
        </Grid>
      </Form>
      <TableC title="Lista de Instituto">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width="150">Instituto</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {listInstitute.map((institute) => (
                <TableRow
                  key={institute.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {institute.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text" aria-label="text button group">
                      <Button>
                        {" "}
                        <Fab
                          color="primary"
                          size="small"
                          aria-label="edit"
                          onClick={handlerClick}
                        >
                          <EditIcon />
                        </Fab>
                      </Button>
                      <Button>
                        {" "}
                        <Fab
                          color="secondary"
                          size="small"
                          aria-label="edit"
                          onClick={() => handlerClick(institute)}
                        >
                          <DeleteIcon />
                        </Fab>
                      </Button>
                    </ButtonGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TableC>
    </>
  );
};

export default Institute;
