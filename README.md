#Website Maintenance
Please follow the instructions below to edit the content of the website.

#Text
-----------
####Research Projects
In order to add/remove research projects you need to change the project.json file. You can add as many projects you want in the existing list of projects.
```
{
	"name" : (required) "Project Title",
	"description" : (required) "Some description",
	"applications" : (optional) [
	    "Application_1",
	    "Application_2",
	] ,
	"img" : (optional) "project.png"
},
```
**Note**

1. Images related to the projects must be placed under /img/project folder.

2. Image must be square in shape. Please use the tools mentioned below to ensure image is of appropriate dimensions and is compressed.

####Publications
Publications list was downloaded from Scopus (https://www.scopus.com/). Please ensure you are on GT network if not use VPN.

1. You can search for the author or can visit the following url https://www.scopus.com/authid/detail.uri?authorId=24403087400
2. Once on the above mentioned page, you can export the publications as BibTex file. Please note, export option can only be used through GT network.
3. Select the following options shown in the image and download (export) the bib file to your laptop
[![N|Solid](/publications/document/export_image.png)](/publications/document/export_image.png)
4. Add the new publications to the top of the file /publications/document/publications.bib and save the file. Please note, do not blindly copy paste all the publications because some of the publication information was fixed manually. Copy pasting all the publications might cause issue in the display of publication list on the html page.
5. Once done run the pub.py file to generate the publications in json format.
    ```
    python pub.py
    ```
6. This will generate a new pub.json file. If everything goes well replace the pub.json file in the main folder with the newly generated file.
7. Seems all good! Things should be updated now :)

####People
You can add/remove/update new students by changing people.json file.

1. Add the following to create a new entry for a student. All the fields are required.

```
{
"name" : "First Last name",
"year" : "Present - yyyy",
"degree" : "Postdoc/PhD/Undergrad",
"description" : "About student",
"email" : "emailid@gatech.edu",
"img" : "student.jpg"
}
```
	
2. Image must be kept inside img/people folder.
3. **Image must be 150x150 pixels in dimension.**
4. The list of student displayed on the page depends on the order in which they are listed in the people.json file.

#Tools
-----------

- Please ensure images are not too heavy. That will impact the websites performance.
> [Pixlr](https://pixlr.com/) for editing, resizing, cropping images.
> [RIOT](http://luci.criosweb.ro/riot/) or [ImageOptim](https://imageoptim.com/command-line.html) to compress do a lossless image compression

- Can minify resources at.
> [Google Minify Resources](https://developers.google.com/speed/docs/insights/MinifyResources)
> [Online Minifier](https://www.freeformatter.com/css-minifier.html)


Thanks,  
Harshit (harshitdaga@gatech.edu)
