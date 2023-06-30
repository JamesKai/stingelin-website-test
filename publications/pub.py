"""
	Bibtex parser : http://bibtexparser.readthedocs.io/en/master/tutorial.html
	To run this file python pub.py
"""

import bibtexparser
import json
import pprint as pp
import sys
import unicodedata

# bib_filename = "sample.bib";
root_dir = "./document/";
bib_filename = ["publications.bib"];
# bib_filename = ["sample.bib"];
out_filename = "pub.json";

# --- PUBLICATION TITLES --- #
AUTHOR = 'author'
TITLE = 'title'
ENTRYTYPE = 'ENTRYTYPE'
YEAR = 'year'
DOI = 'doi'
URL = 'url'
ABSTRACT = 'abstract'
JOURNAL = 'journal'
PUBLISHER = 'publisher'
NOTE = 'note'
SOURCE = 'source'
ID = 'ID'
DOCUMENT_TYPE = 'document_type'
ABBREV_SOURCE_TITLE = 'abbrev_source_title'
ISSN = 'issn'
JOURNAL_DETAIL = 'journal_detail'
VOLUME = 'volume'
NUMBER = 'number'
PAGES = 'pages'

g_allowed_columns = [AUTHOR, TITLE, ENTRYTYPE, YEAR, DOI, URL, JOURNAL, PUBLISHER, NOTE, SOURCE, ID, DOCUMENT_TYPE, ISSN, VOLUME, NUMBER, PAGES]


# To remove foreign chara
# https://gis.stackexchange.com/questions/58251/replacing-non-english-characters-in-attribute-tables-using-arcpy-and-python
# def strip_accents(s):
	# return ''.join(c for c in unicodedata.normalize('NFD', s) if unicodedata.category(c) != 'Mn');

def read_bib(filename):
	print "Reading bibtex entries from : " + filename;
	with open(filename) as bibtex_file:
		bib_database = bibtexparser.load(bibtex_file)
	# print(bib_database.entries)
	return bib_database;

def toJSON(data_item):
	total_size = len(data_item);
	bib_enties = [];
	print "Dumping json entries to : " + out_filename;

	outfile = open(out_filename, 'w');

	processed_count = 0;
	for entry in data_item:
		keys = entry.keys();
		tmp = {};
		for col in g_allowed_columns:
			if col in keys:
				try:
					tmp_col = col.lower();
					# tmp_value = str(entry[col]);
					# tmp_value = str(strip_accents(u"{0}".format(entry[col])));
					tmp[tmp_col] = entry[col];
				except Exception as e:
					print("type error: " + str(e))
					print entry;
					print "col : " + col + " --> " + entry[col];
					sys.exit()

		jd = "";
		if JOURNAL in keys and tmp[JOURNAL]:
			jd = tmp[JOURNAL] + ", " + tmp[YEAR];
			if VOLUME in keys and tmp[VOLUME]:
				jd += ", Volume " + tmp[VOLUME];
			if NUMBER in keys and tmp[NUMBER]:
				jd += ", Issue " + tmp[NUMBER];
			if PAGES in keys and tmp[PAGES]:
				jd += ", Pages " + tmp[PAGES];

		tmp[JOURNAL_DETAIL] = jd;
		bib_enties.append(tmp);

		processed_count+=1;
		print "Total : " + str(total_size) + " --> processed : " + str(processed_count);

	json.dump(bib_enties, outfile, indent=4, sort_keys=True)

db = [];
for f in bib_filename:
	f = root_dir + f;
	bib_database = read_bib(f);
	db.extend(bib_database.entries);

db = sorted(db, key=lambda k: k[YEAR], reverse=True)

print "Keys : " + str(db[0].keys());
toJSON(db), out_filename;
