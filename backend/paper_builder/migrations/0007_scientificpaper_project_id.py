from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("paper_builder", "0006_scientificpaper_scientific_object_references"),
    ]

    operations = [
        migrations.AddField(
            model_name="scientificpaper",
            name="project_id",
            field=models.CharField(blank=True, db_index=True, max_length=255, null=True),
        ),
    ]
