import axios, {
    AxiosResponse,
    AxiosError
} from "../../node_modules/axios/index";

let baseUri = "https://s3eksamenskabelon.azurewebsites.net/api/students2"

interface IStudent {
    id: number,
    name: string,
    age: number
}

new Vue({
    el: "#app",
    data: {
        students: [],
        addForm: {
            name: "",
            age: 0
        },
        editForm: {
            name: "",
            age: 0
        },
        idToEdit: 0
    },
    methods: {
        GetAllStudents() {
            axios.get<IStudent[]>(baseUri)
                .then((response: AxiosResponse<IStudent[]>) => {
                    this.students = response.data
                    console.log(response.data)
                })
                .catch((error: AxiosError) => {
                    console.log(error.message)
                })
        },
        GetStudentById() {
            axios.get<IStudent>(baseUri + "/" + this.idToEdit)
            .then((response: AxiosResponse<IStudent>) => {
                console.log(this.idToEdit)
                this.editForm = response.data
                console.log(this.editForm)
            })
        },
        DeleteStudent(id: number) {
            if (confirm("Er du sikker på at du vil slette denne student?")) {
                axios.delete<IStudent>(baseUri + "/" + id)
                    .then((response: AxiosResponse<IStudent>) => {
                        console.log(id + " was deleted")
                        this.GetAllStudents()
                    })
                    .catch((error: AxiosError) => {
                        console.log(error.message)
                    })
            }
        },
        AddStudent(){
            // axios.post<IStudent>(baseUri, {name: this.addForm.name, age: Number(this.addForm.age) })
            axios.post<IStudent>(baseUri, this.addForm)
            .then((response: AxiosResponse) => {
                console.log(response.status)
                this.GetAllStudents()
                console.log(this.addForm)
            })
            .catch((error: AxiosError) => {
                console.log(error.message)
            }) 
        },
        EditStudent(){
            axios.put<IStudent>(baseUri + "/" + this.idToEdit, this.editForm)
            .then((response: AxiosResponse) => {
                console.log(response.status)
                this.GetAllStudents()
                console.log(this.editForm)
                console.log(this.idToEdit)
            })
            .catch((error: AxiosError) => {
                console.log(error.message)
            }) 
        }
    },
    created() {
        this.GetAllStudents()
    }
})