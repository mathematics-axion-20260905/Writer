from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("paper_builder", "0005_paperlaboratoryusage"),
    ]

    operations = [
        migrations.AddField(
            model_name="scientificpaper",
            name="scientific_object_references",
            field=models.JSONField(blank=True, default=list),
        ),
    ]
