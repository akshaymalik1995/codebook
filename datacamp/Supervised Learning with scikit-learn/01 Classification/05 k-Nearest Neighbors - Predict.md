Now you have fit a KNN classifier, you can use it to predict the label of new data points.


```python
X_new = np.array([[30.0, 17.5],
                  [107.0, 24.1],
                  [213.0, 10.9]])
# Predict the labels for the X_new
y_pred = knn.predict(X_new)
```

