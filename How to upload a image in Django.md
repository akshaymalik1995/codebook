
1. First, you need to create a model for your image. This model should include fields for the image file, as well as any additional information you wish to store about the image, such as a caption or title.
```py
from django.db import models
class Image(models.Model):
	title = models.Charfield(max_length = 255)
	image = models.ImageField(upload_to='images/')
	uploaded_at = models.DateTimeField(auto_now_add=True)
```

2. Next, you will need to create a form that will handle the image upload. This form should include a file field for the image, as well as any additional fields that you have included in your model.

```py
from django import forms
class ImageForm(forms.ModelForm):
	class Meta:
		model = Image
		fields = ('title', 'image')
```

3. In your `views.py`  you will need to create a view that will handle the image upload. This view should handle the form submission, the save the image to the database.

```py
from django.shortcuts import render
from .forms import ImageForm

def upload_image(request):
	if request.method == 'POST':
		form = ImageForm(request.POST, request.FILES)
		if form.is_valid():
			form.save()
			return redirect('success')
	else:
		form = ImageForm()
	return render(request, 'upload.html', {"form", "form"})
```

4. Finally, you will need to create a template that will handle the image upload. This template should include a form that allow users to select and upload an image, as well as any additional fields that you have included in your model. 

```py
<form method="post" enctype="multipart/form-data">
	{% csrf_token %}
	{{ form.as_p }}
<input type="submit" value="Upload">
```

In this way you can upload image in django easily. You can also add validation, image compression, and other functionality to the image upload process.