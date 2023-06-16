import React, { Component } from 'react';
import axios from "axios";
import AppDb from './AppDb';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataKaryawan: [],
      objectKaryawan: {
        id: 1,
        nama_karyawan: "",
        jabatan: "",
        jenis_kelamin: "",
        tanggal_lahir: "",
      },
      update: false
    };
    this.handDelete=this.handDelete.bind(this)
    this.handleInput=this.handleInput.bind(this)
    this.postDataKaryawan=this.postDataKaryawan.bind(this)
  }



  getApi() {
    axios
      .get("http://localhost:3004/data-karyawan?_sort=id&_order=desc")
      .then((result) => {
        this.setState({
          dataKaryawan: result.data,
        });
      });
  }

  handleInput(e) {
    let newObjectKaryawan = { ...this.state.objectKaryawan };
    if (!this.state.update) {
      newObjectKaryawan['id'] = new Date().getTime();
    }
    newObjectKaryawan[e.target.name] = e.target.value;
    this.setState({
      objectKaryawan : newObjectKaryawan
    })
  }


  clearData = () => {
     let clearData = { ...this.state.objectKaryawan };
        clearData['id'] = '';
        clearData["nama_karyawan"] = "";
        clearData["jabatan"] = "";
        clearData["jenis_kelamin"] = "";
        clearData["tanggal_lahir"] = "";

        this.setState({
          objectKaryawan : clearData
        })
  }

  putData = () => {
    axios.put(`http://localhost:3004/data-karyawan/${this.state.objectKaryawan.id}`, this.state.objectKaryawan).then((res) => {
      this.getApi();
      this.setState({
        update: false,
        objectKaryawan: {
          id: 1,
          nama_karyawan: "",
          jabatan: "",
          jenis_kelamin: "",
          tanggal_lahir: "",
        },
      });
    });
  }

  postDataKaryawan() {    
      axios
        .post(
          "http://localhost:3004/data-karyawan",
          this.state.objectKaryawan
        )
        .then((ress) => {
          this.getApi();
         
        });
  }

  handleSubmit = () => {
    if (this.state.update) {
      this.putData()
    } else {
      
      this.postDataKaryawan()
    }
  }

  handDelete(ev) {
    axios.delete(`http://localhost:3004/data-karyawan/${ev}`).then((res) => {
      this.getApi()
    });
  }

  handleEdit=(data)=>{
    this.setState({
      objectKaryawan: data,
      update:true
      
    })
  }

  componentDidMount() {
    this.getApi()
  }





  render() {
    return (
      <>
        <div className="header">
          <h2>Data Karyawan</h2>
        </div>
        <form className="form">
          <label className="label">
            Name
            <input
              className="input"
              type="text"
              name="nama_karyawan"
              placeholder="Masukan Nama"
              onChange={this.handleInput}
              value={this.state.objectKaryawan.nama_karyawan}
            />
          </label>

          <label className="label">
            Jabatan
            <input
              className="input"
              type="text"
              name="jabatan"
              placeholder="Masukan Jabatan"
              onChange={this.handleInput}
              value={this.state.objectKaryawan.jabatan}
            />
          </label>

          <label className="label">
            Jenis Kelamin
            <input
              className="input"
              type="text"
              name="jenis_kelamin"
              placeholder="Jenis Kelamin"
              onChange={this.handleInput}
              value={this.state.objectKaryawan.jenis_kelamin}
            />
          </label>

          <label className="label">
            Tanggal Lahir
            <input
              className="input"
              type="date"
              name="tanggal_lahir"
              onChange={this.handleInput}
              value={this.state.objectKaryawan.tanggal_lahir}
            />
          </label>
          <input type="submit" value="Submit" className="submit" onClick={this.handleSubmit}/>
        </form>

        {this.state.dataKaryawan.map((post) => {
          return (
            <AppDb
              key={post.id}
              data={post}
              delete={this.handDelete}
              edit={this.handleEdit}
              valId={post.id}
            />
          );
        })}
      </>
    );
  }
}

export default App;
