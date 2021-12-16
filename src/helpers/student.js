import axios from "axios";

const URL = "http://54.89.197.176:31345/repository/students";

export const getStudents = async () => {
  const res = await axios.get(URL);
  const students = res.data;
  return students;
};

export const postStudent = async (data) => {
  const res = await axios.post(URL, data);
  return res;
};

export const deleteStudent = async (idStudent) => {
  const res = await axios.delete(URL+"/"+idStudent)
  return res

}

export const updateStudent = async (idStudent, data) => {
  const res = await axios.put(URL+"/"+idStudent, data)
  return res
}