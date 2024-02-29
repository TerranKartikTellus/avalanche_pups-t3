import joblib
import pandas
import statsmodels.formula.api as smf
import subprocess
# from avalanche_pups.worker.graphing import *
import csv

data = pandas.read_csv('csv.csv')
model = smf.ols(formula="boot_size ~ harness_size", data=data).fit()
print("Model trained!")

model_filename = './avalanche_dog_boot_model.pkl'
joblib.dump(model, model_filename)
print("Model saved!")
