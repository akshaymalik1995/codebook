**Dataset columns:**

```python
churn_df.columns
# Index(['account_length', 'total_day_charge', 'total_eve_charge', 'total_night_charge', 'total_intl_charge', 'customer_service_calls', 'churn'], dtype='object')
```

In this exercise, you will build your first classification model using the `churn_df` dataset

The features to use will be `"account_length"` and `"customer_service_calls"`. The target, `"churn"`, needs to be a single column with the same number of observations as the feature data.

You will convert the features and the target variable into NumPy arrays, create an instance of a KNN classifier, and then fit it to the data.

```python
# Import KNeighborsClassifier
from sklearn.neighbors import KNeighborsClassifier
# Create arrays for the features and the target variable
y = churn_df["churn"].values
X = churn_df[["account_length", "customer_service_calls"]].values

# Create a KNN classifier with 6 neighbors
knn = KNeighborsClassifier(n_neighbors = 6)
# Fit the classifier to the data
knn.fit(X, y)
```

Now you have fit a KNN classifier, you can use it to predict the label of new data points.


```python
X_new = np.array([[30.0, 17.5],
                  [107.0, 24.1],
                  [213.0, 10.9]])
# Predict the labels for the X_new
y_pred = knn.predict(X_new)
```


