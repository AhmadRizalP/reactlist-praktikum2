import React from "react";

class Card extends React.Component {
  render() {
    return (
      <div className="box mb-1">
        <div className="boxleft">
          <img
            className="img-rounded"
            src={this.props.image}
            width="95px"
            height="133px"
          />
          <div className="info">
            <div className="judul">
              <h4>{this.props.nama}</h4>
            </div>
            <div className="ket">
              <h6>Harga Barang</h6>
              <p>{this.props.harga},-</p>
            </div>
          </div>
        </div>
        <div className="boxright">
          <div className="jumlah">
            <button className="plusmin" onClick={this.props.minus}>
              <img src="/image/minus.svg" width="12px" height="12px" />
            </button>
            <input
              value={this.props.jumlah}
              disabled
              onChange={this.props.quanty}
              type="text"
              name="jumlah"
            />
            <button className="plusmin" onClick={this.props.plus}>
              <img src="/image/plus.svg" width="12px" height="12px" />
            </button>
          </div>
          <div className="subtotal">
            <h6 className="text-right">SubTotal</h6>
            <p className="text-right">{this.props.subtotal},-</p>
            <div className="tombol">
              <button
                className="buttonedit m-1"
                data-toggle="modal"
                data-target="#modal"
                onClick={this.props.edit}
              >
                EDIT
              </button>
              <button className="buttondelete m-1" onClick={this.props.drop}>
                DELLETE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
