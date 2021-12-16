import Form from "../components/Form";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import TableC from "../components/Table";
import {
  Button,
  ButtonGroup,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import {
  deleteStudent,
  getStudents,
  postStudent,
  updateStudent,
} from "../helpers/student";
import toast, { Toaster } from "react-hot-toast";

const initialStudent = {
  name: "",
  lastname: "",
  email: "",
  dni: "",
  phone: "",
  institute: "",
  careers: "",
};

const listInstitute = [
  { value: "Valle Grande", label: "Valle Grande" },
  { value: "Condoray", label: "Condoray" },
];

const listCareersInitial = [
  {
    id: "Valle Grande",
    value: "Analisis de sistemas",
    label: "Analisis de Sistemas",
  },
  {
    id: "Valle Grande",
    value: "Produccion Agraria",
    label: "Produccion Agraria",
  },
  { id: "Condoray", value: "Contador", label: "Contador" },
  { id: "Condoray", value: "Administracion", label: "Administracion" },
];

export const Student = () => {
  const [student, setStudent] = useState(initialStudent);
  const [students, setStudents] = useState([]);
  const [listCareers, setListCareers] = useState([]);
  const [update, setUpdate] = useState(false);

  const updateStudents = () => {
    getStudents().then((studentsNew) => {
      console.log(studentsNew);
      setStudents(studentsNew);
    });
  };

  const handleChangueStudent = (event) => {
    setStudent({ ...student, [event.target.name]: event.target.value });
  };

  const handleChangueInstitute = (event) => {
    setStudent({ ...student, institute: event.target.value });
    setListCareers(
      listCareersInitial.filter((careers) => careers.id === event.target.value)
    );
  };

  const deleteStudentSelect = (studentSelected) => {
    const deleteId = studentSelected.id;
    console.log(deleteId);
    const res = deleteStudent(deleteId);
    toast.promise(res, {
      loading: "Cargando...",
      error: (err) => console.log(err),
      success: "Se elimino con exito!",
    });
    updateStudents();
  };

  const updateStudentSelect = () => {
    const updateId = student.id;
    const res = updateStudent(updateId, student);
    toast.promise(res, {
      loading: "Cargando...",
      error: (err) => console.log(err),
      success: "Se actualizo con exito!",
    });
    updateStudents();
    setStudent(initialStudent)
    setUpdate(false);
  };

  const handleUpdateStudentSelect = (studentSelected) => {
    setUpdate(true);
    setStudent(studentSelected);
    setListCareers(
      listCareersInitial.filter(
        (careers) => careers.id === studentSelected.institute
      )
    );
  };

  const sendStudent = () => {
    const res = postStudent({ ...student, status: "ACTIVATED" });
    toast.promise(res, {
      loading: "Cargando...",
      error: (err) => console.log(err),
      success: "Enviado con exito!",
    });
    updateStudents();
  };

  useEffect(() => {
    updateStudents();
  }, []);
  return (
    <>
      <Form title="Estudiante">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={student.name}
              onChange={handleChangueStudent}
              name="name"
              label="Nombre"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Apellido"
              value={student.lastname}
              onChange={handleChangueStudent}
              name="lastname"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Email"
              value={student.email}
              onChange={handleChangueStudent}
              name="email"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="DNI"
              type="number"
              value={student.dni}
              onChange={handleChangueStudent}
              name="dni"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Celular"
              type="number"
              value={student.phone}
              onChange={handleChangueStudent}
              name="phone"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Instituto</InputLabel>
              <Select
                label="Instituto"
                name="institute"
                value={student.institute}
                onChange={handleChangueInstitute}
              >
                <MenuItem value="">
                  <em>Ninguno</em>
                </MenuItem>
                {listInstitute.map((institute) => (
                  <MenuItem key={institute.value} value={institute.value}>
                    {institute.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel>Carrera</InputLabel>
              <Select
                label="Carrera"
                value={student.careers}
                name="careers"
                onChange={handleChangueStudent}
              >
                {listCareers.length === 0 ? (
                  <MenuItem value="">
                    <em>Ninguno</em>
                  </MenuItem>
                ) : (
                  listCareers.map((career) => (
                    <MenuItem key={career.value} value={career.value}>
                      {career.label}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            {!update ? (
              student.name !== "" &&
              student.lastname !== "" &&
              student.email !== "" &&
              student.careers !== "" &&
              student.institute !== "" &&
              student.dni !== "" &&
              student.phone !== "" ? (
                <Button variant="contained" onClick={sendStudent}>
                  Enviar
                </Button>
              ) : (
                <Button variant="contained" disabled onClick={sendStudent}>
                  Enviar
                </Button>
              )
            ) : (
              <Button variant="contained" onClick={updateStudentSelect}>
                Modificar
              </Button>
            )}
          </Grid>
        </Grid>
      </Form>
      <TableC title="Lista de estudiantes">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Celular</TableCell>
                <TableCell>DNI</TableCell>
                <TableCell>instituto</TableCell>
                <TableCell>Carrera</TableCell>
                <TableCell align="center">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {student.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.lastname}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.phone}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.dni}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.institute}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {student.careers}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <ButtonGroup variant="text" aria-label="text button group">
                      <Button>
                        {" "}
                        <Fab
                          color="primary"
                          size="small"
                          aria-label="edit"
                          onClick={() => handleUpdateStudentSelect(student)}
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
                          onClick={() => deleteStudentSelect(student)}
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
      <Toaster />
    </>
  );
};

export default Student;
