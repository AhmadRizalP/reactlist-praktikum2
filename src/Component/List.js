import React from "react";
import "./List.css";
import Card from "./Card";
import DaftarBelanja from "./DaftarBelanja";
import $ from "jquery";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      keranjang: [
        {
          nama: "Novel Bulan",
          harga: 90000,
          jumlah: 1,
          subtotal: 90000,
          image:
            "https://drive.google.com/uc?id=1ui-jyKgu3DqFyo7VKJu-FFXkaNQN3aSg",
        },
        {
          nama: "Novel Bumi",
          harga: 85000,
          jumlah: 1,
          subtotal: 85000,
          image:
            "https://drive.google.com/uc?id=1DIW8qvYb9AvK7g8WiqLjSgupnP418ZN0",
        },
        {
          nama: "Novel Hujan",
          harga: 50000,
          jumlah: 1,
          subtotal: 50000,
          image:
            "https://drive.google.com/uc?id=1BH9hsP0yEDYMliPWbUe2dVm2Zj0DIlAT",
        },
      ],
      nama: "",
      harga: "",
      image: "",
      total: "",
      selectedItem: null,
      action: "",
    };
  }
  setTotal = async () => {
    let temp = this.state.keranjang;
    let result = temp.reduce(
      (total, currentValue) => (total = total + currentValue.subtotal),
      0
    );
    this.setState({ total: result });
  };

  SaveKeranjang = async (event) => {
    event.preventDefault();
    let temp = this.state.keranjang;

    if (this.state.action === "insert") {
      temp.push({
        nama: this.state.nama,
        harga: this.state.harga * 1,
        jumlah: 1,
        subtotal: this.state.harga * 1,
      });
    } else if (this.state.action === "update") {
      let index = temp.indexOf(this.state.selectedItem);

      temp[index].nama = this.state.nama;
      temp[index].harga = this.state.harga;
      temp[index].subtotal = temp[index].harga * temp[index].jumlah;
    }
    this.setState({ keranjang: temp });
    this.setTotal();

    $("#modal").modal("hide");
  };

  Plus = async (index) => {
    let temp = this.state.keranjang;
    temp[index].jumlah = temp[index].jumlah + 1;
    temp[index].subtotal = temp[index].harga * temp[index].jumlah;

    this.setState({ keranjang: temp });
    this.setTotal();
  };
  Minus = async (index) => {
    let temp = this.state.keranjang;

    temp[index].jumlah = temp[index].jumlah - 1;
    temp[index].subtotal = temp[index].harga * temp[index].jumlah;

    this.setState({ keranjang: temp });
    this.setTotal();
  };

  Edit = (item) => {
    this.setState({
      nama: item.nama,
      harga: item.harga,
      image: item.image,
      action: "update",
      selectedItem: item,
    });
  };

  Add = () => {
    this.setState({
      nama: "",
      harga: "",
      image: "",
      action: "insert",
    });
  };

  ChangeQty = (index) => {
    let temp = this.state.keranjang;
    if (temp[index].jumlah < 1) {
      temp.splice(index, 1);
      this.setState({ keranjang: temp });
    }
  };

  Drop = async (index) => {
    let temp = this.state.keranjang;

    temp.splice(index, 1);
    this.setState({ keranjang: temp });

    this.setTotal();
  };

  componentDidMount() {
    this.setTotal();
  }

  render() {
    return (
      <div>
        <h1 className="text-center m-3">KERANJANG BELANJA</h1>
        <div className="container">
          <div className="left">
            {this.state.keranjang.map((item, index) => {
              return (
                <Card
                  key={index.toString()}
                  nama={item.nama}
                  harga={item.harga}
                  jumlah={item.jumlah}
                  subtotal={item.subtotal}
                  image={item.image}
                  plus={() => this.Plus(index)}
                  minus={() => this.Minus(index)}
                  quanty={this.ChangeQty(index)}
                  drop={() => this.Drop(index)}
                  edit={() => this.Edit(item)}
                />
              );
            })}
          </div>
          <div className="right">
            <div className="boxPembayaran">
              <div className="right1">
                <div className="pembayaran">
                  <p>PEMBAYARAN</p>
                </div>
                {this.state.keranjang.map((item, index) => {
                  return (
                    <DaftarBelanja
                      key={index.toString()}
                      nama={item.nama}
                      subtotal={item.subtotal}
                    />
                  );
                })}

                <div className="total">
                  <p className="font-weight-bold">Total</p>
                  <p>{this.state.total}</p>
                </div>
                <button className="checkout">CHECKOUT</button>
              </div>
            </div>

            <button
              className="tambahBelanja"
              onClick={this.Add}
              data-toggle="modal"
              data-target="#modal"
            >
              Tambah Belanja
            </button>
          </div>
        </div>

        <div className="modal fade" id="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5>Form Agenda</h5>
              </div>
              <form onSubmit={(event) => this.SaveKeranjang(event)}>
                <div className="modal-body">
                  Nama Barang
                  <input
                    type="text"
                    className="form-control"
                    onChange={(ev) => this.setState({ nama: ev.target.value })}
                    value={this.state.nama}
                    required
                  />
                  Harga
                  <input
                    type="text"
                    className="form-control"
                    onChange={(ev) => this.setState({ harga: ev.target.value })}
                    value={this.state.harga}
                    required
                  />
                  Image
                  <input
                    type="url"
                    className="form-control"
                    onChange={(ev) => this.setState({ image: ev.target.value })}
                    value={this.state.image}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-dark">
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
