# Stingelin Lab Website

This is the source code for the Natalie Stingelin's Group website at Georgia Tech.

> This instructions are meant for the IT/maintainer of the website. 
If you are a lab member, you can still look around the source code to understand how the website is built, and help find bugs or issues.
But if you want to update your information, please contact the maintainer.

## Introduction

This README file contains information on how to update the website content. It is a static 
website built with frontend technology only (implemented in jquery), thus no server side code is required.
The formal website is hosted on Georgia Tech's plesk server and can be found at [Stingelin Formal Website](http://stingelin.gatech.edu/),
whereas the development version is hosted currently on vercel, and can be found at [Stingelin Test Website](https://stingelin-website-test.vercel.app/).
The test website is used to test the changes before pushing them to the formal website. Note, the test website is subject to changes depending
on the maintainer's need.

Below, you will find the instructions regarding
1. Overall structure for the Website
2. How to update specific sections of the website, including research projects, publications, and people.
3. Some useful tools to help you edit the content of the website.
4. How to test the changes on testing website.
5. How to push the changes to the formal website. 

## Overall Structure for the Website

The website mainly consists of the following sections/pages:
* Home
* Professor Natalie Stingelin's Profile
* Research Projects
	* Projects
	* Affiliations
	* Collaborations
	* Funding
	* Sponsors
* Publications
* People
	* Current Members
	* Postdocs
	* Graduate Students
	* Undergrads
	* Alumni

## How to update specific sections of the website for lab members

### Research Projects

In order to add/remove research projects you need to change the `project.json` file. You can add as many projects you want in the existing list of projects.

```json
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

###  Publications

Publications list was downloaded from [Scopus](https://www.scopus.com/). **Please ensure you are on GT network to access the publications from Scopus.**
You can use VPN to access them if you are not on GT network.

1. You can search for the author or can visit the following url [Scopus for Natalie Stingelin](https://www.scopus.com/authid/detail.uri?authorId=24403087400)
2. Once on the above mentioned page, you can export the publications as BibTex file. Please note, export option can only be used through GT network.
3. Select the following options shown in the image and download (export) the bib file to your local machine.
   [![N|Solid](/publications/document/export_image.png)](/publications/document/export_image.png)

4. Once done run the `pub.py` file to generate the publications in json format. You need to have Python 3 installed on your system, as well as the following libraries: `bibtexparser` and `json`. Typically, `json` is included in the Python standard library, but you may need to install `bibtexparser`. Once you have the required libraries, you can run the following command in the terminal to generate the json file.
   ```bash
   python pub.py
   ```
   	**Important Note**: `pub.py` assume your input bib file containing specific fields, and use these fields to generate json file. These fields is based on the Scopus export format. However, sometimes Scopus may change the format of the export file, which may lead to the failure of the script. In such cases, you may need to modify the following script located at `pub.py` to match the new format of the export file.
	```python
	AUTHOR = "author"
	TITLE = "title"
	ENTRYTYPE = "ENTRYTYPE"
	YEAR = "year"
	DOI = "doi"
	URL = "url"
	ABSTRACT = "abstract"
	JOURNAL = "journal"
	PUBLISHER = "publisher"
	NOTE = "note"
	SOURCE = "source"
	ID = "ID"
	DOCUMENT_TYPE = "type"
	ABBREV_SOURCE_TITLE = "abbrev_source_title"
	ISSN = "issn"
	JOURNAL_DETAIL = "journal_detail"
	VOLUME = "volume"
	NUMBER = "number"
	PAGES = "pages"
	```
5. This will generate a new pub.json file. If everything goes well replace the pub.json file in the main folder with the newly generated file. It is always recommended to keep a backup of the old file before replacing it.
6. Seems all good! Things should be updated now!



### People

You can add/remove/update new students by changing `people.json` file.

1. Add the following to create a new entry for a student. All the fields are required.

```json
{
"name" : "First Last Name",
"year" : "yyyy - yyyy", // for alumni
"year" : "yyyy - present", // for current members.
"degree" : "Postdoc/PhD/MS/Undergrad", // all of these fields can be followed by ", Alumni" if the person has left the lab. e.g., "Phd, Alumni".
"description" : "About student", // 3-5 sentences, try keep it ~100 words or less.
"email" : "emailid@gatech.edu",
"img" : "student.jpg"
}
```

A few things to note:
1. The website categorizes students based on the degree they are pursuing. So, please make sure to add the correct degree.
2. For the images:
	- Image **MUST** be kept inside img/people folder, with the name of the file matching the name of "img" field in the json file, otherwise it will not be displayed.
	- **Image is strongly recommended to be 150x150 pixels in dimension**, for quality and performance reasons.
	- The list of student displayed on the page depends on the order in which they are listed in the people.json file.

## Tools

- Please ensure images are not too heavy. That will impact the websites performance severely.
Some of the tools as follows can be used to edit or compress images.

> [Pixlr](https://pixlr.com/) for editing, resizing, cropping images.
> [RIOT](http://luci.criosweb.ro/riot/) or [ImageOptim](https://imageoptim.com/command-line.html) to compress do a lossless image compression

- For minifying HTML, CSS or javascript resources, you can refer to the following links:

> [Google Minify Resources](https://developers.google.com/speed/docs/insights/MinifyResources) > [Online Minifier](https://www.freeformatter.com/css-minifier.html)

## Testing the changes on the test website

Since the website is static, the effective way to test the changes is to run the website locally on your machine. I (James) personally recommend using the `live-server` extension in Visual Studio Code. You can install the extension from the Visual Studio Code marketplace. Once installed, with the `index.html` file open, you can run the VS Code command `Live Server: Start Server`. This will open the website in your default browser. You can then test the changes on the local website. Close the server by running the command `Live Server: Stop Server`.

Once you are satisfied with the changes, you can push the changes to the test website. The test website is hosted on Vercel. It is recommended to connect your GitHub account with Vercel. Once connected, you can push the changes to the `main` branch. The changes will be automatically deployed to the test website. You can then test the changes on the test website.

You can use the the test website to demonstrate the changes to the lab members. Once everyone is satisfied with the changes, you can push the changes to the formal website.

## Pushing the changes to the formal website

Once you are satisfied with the changes on the test website, you can push the changes to the formal website. Belows are few things to follow before you can push changes to the formal website.

1. You need to gain editing access to the website:
	- Contact MSE IT and request edit access to the Stingelin Lab website - https://stingelin-lab.gatech.edu/. Current contact (as of Oct. 2024) is Bill Miller (bill.miller@mse.gatech.edu)
2. Under GT network, you can go to [GT Plesk Hosting](https://hosting.gatech.edu/) and login to the plesk deshboard.
3. Once logged in, you can navigate to the Stingelin Lab website.
4. Click the website link (should display as `stingelin-lab.gatech.edu`) to open the website dashboard.
5. Follow the instruction below to get the **ip address (or domain name of the server)**, **username**, and set the **password** for connecting to the server. They are required for connecting to the server using SFTP.
[![N|Solid](/README_files/get_sftp_info.png)](/README_files/get_sftp_info.png)
6. Once you have the required information, you can use any SFTP client to connect to the server. There are multiple SFTP clients available, such as Transmit, WinSCP, Cyberduck, etc. You can use any of them to connect to the server. Alternatively, you can use the terminal to connect to the server using the `sftp` command.
7. Once connected to the server, you can push the changes to the server by replacing the files on the server with the updated files. Alternatively, you can also connect the server to your GitHub repository in the plesk dashboard, such that when you push the code changes to the GitHub repository, the changes are automatically deployed to the server. This is the recommended way to push the changes to the server as you have source code control.

## Authors and Maintainers:  
- Harshit (harshitdaga@gatech.edu) [previous maintainer]
- James (james.kai@gatech.edu) [author of this file and maintainer since 2022-11-30]