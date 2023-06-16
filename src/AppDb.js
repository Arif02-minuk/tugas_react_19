import React from "react";
import  './App.css';

function AppDb(props) {
    return (
      <div className="data">
        <p className="kata">Nama :{props.data.nama_karyawan} </p>
        <p className="kata">Jabatan : {props.data.jabatan}</p>
        <p className="kata">Jenis Kelamin :{props.data.jenis_kelamin} </p>
        <p className="kata">Tanggal Lahir :{props.data.tanggal_lahir} </p>
        <button type="submit" className="delete" onClick={() => { props.delete(props.data.id) }}>
          Delete
        </button>

        <button type="submit" className="edit" onClick={() => { props.edit(props.data) }} value={props.valId}>
          Edit Data
        </button>
      </div>
    );
    
}

export default AppDb;