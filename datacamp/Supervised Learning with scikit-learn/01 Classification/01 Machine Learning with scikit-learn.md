
## What is machine learning?

Machine learning is the process whereby computers learn to make decisions from data without being explicitly programmed.

## Examples of machine learning

For example, learning to predict whether an email is spam or not spam given its content and sender. Or learning to cluster books into different categories based on the words they contain, then assigning any new book to one of the existing clusters.

## Unsupervised learning

Unsupervised learning is the process of uncovering hidden patterns and structures from unlabeled data. For example, a business may wish to group its customers into distinct categories based on their purchasing behavior without knowing in advance what these categories are. This is known as clustering, one branch of unsupervised learning.

## Supervised learning

Supervised learning is a type of machine learning where the values to be predicted are already known, and a model is built with the aim of accurately predicting values of previously unseen data. Supervised learning uses features to predict the value of a target variable, such as predicting a basketball player's position based on their points per game.

## Types of Supervised Learning

There are two types of supervised learning. Classification is used to predict the label, or category, of an observation. For example, we can predict whether a bank transaction is fraudulent or not. As there are two outcomes here - a fraudulent transaction, or non-fraudulent transaction, this is known as binary classification. Regression is used to predict continuous values. For example, a model can use features such as number of bedrooms, and the size of a property, to predict the target variable, price of the property.

Note that what we call a feature, others may call a predictor variable or independent variable. Also, what we call the target variable, others may call dependent variable or response variable.

## Requirements

There are some requirements to satisfy before performing supervised learning. Our data must not have missing values, must be in numeric format, and stored as pandas `DataFrames` or` Series`, or NumPy arrays. This requires some exploratory data analysis first to ensure data is in the correct format. Various pandas methods for descriptive statistics, along with appropriate data visualizations, are useful in this step.

## scikit-learn syntax

scikit-learn follows the same syntax for all supervised learning models, which makes the workflow repeatable.

1. We import a Model, which is a type of algorithm for our supervised learning problem, from an `sklearn` module. For example, the k-Nearest Neighbors model uses distance between observations to predict labels or values.
2. We create a variable named `model`, and instantiate the `Model`.
3. A model is fit to the data, where it learns patterns about the features and the target variable. We fit the model to `X`, an array of our features, and `y`, an array of our target variable values.
4. We then use the model's `predict()` method, passing six new observations, `X_new`.

```python
# import the module
from sklearn.module import Model
# Instantiate the model
model = Model()
# Fit the model to the data
model.fit(X, y)
# Predict
predictions = model.predict(X_new)
```


