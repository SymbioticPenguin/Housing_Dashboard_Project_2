from flask import Flask, jsonify, render_template, send_from_directory
import numpy as np
import pandas as pd

import datetime as dt
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

engine = create_engine("sqlite:///Resources/zillow.sqlite")

Base = automap_base()

Base.prepare(engine, reflect=True)

Zillow = Base.classes.zillow


session = Session(engine)



app = Flask(__name__, static_folder="static")


@app.route("/")
def welcome():
    return render_template("index.html")

@app.route("/mp4")
def mp4():
    return send_from_directory(app.static_folder,"./media/LaJolla.mp4")

@app.route('/zillow')
def zillow():
    data=session.query(Zillow.Year,Zillow.San_Diego,Zillow.Chula_Vista,Zillow.Oceanside,Zillow.Escondido,Zillow.El_Cajon,Zillow.Vista,Zillow.Carlsbad,Zillow.San_Marcos,Zillow.Spring_Valley,Zillow.La_Mesa,Zillow.Encinitas,Zillow.National_City,Zillow.Santee,Zillow.Poway,Zillow.Fallbrook,Zillow.Lakeside,Zillow.Ramona,Zillow.Imperial_Beach,Zillow.Lemon_Grove,Zillow.Coronado,Zillow.Valley_Center,Zillow.Alpine,Zillow.Bonita,Zillow.Solana_Beach,Zillow.Jamul,Zillow.Rancho_Santa_Fe,Zillow.Bonsall,Zillow.Descanso,Zillow.Campo,Zillow.Del_Mar,Zillow.Dulzura,Zillow.Julian,Zillow.Borrego_Springs,Zillow.Pauma_Valley,Zillow.Warner_Springs,Zillow.Pala,Zillow.Santa_Ysabel,Zillow.Boulevard,Zillow.Pine_Valley,Zillow.Potrero,Zillow.Palomar_Mountain).all()
    session.close()
    df=pd.DataFrame(data)
    return jsonify(df.to_dict("records"))

if __name__ == "__main__":
    app.run(debug=True)
