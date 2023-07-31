import pandas as pd
import json
import argparse

# function to convert json to dataframe
def json_to_df(json_file):
    with open(json_file) as f:
        data = json.load(f)
    df = pd.DataFrame(data)
    return df


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--json", help="input json file")
    parser.add_argument("--xlsx", help="output xlsx file")
    args = parser.parse_args()

    if args.json:
        df = json_to_df(args.json)
        df.to_excel(args.xlsx, index=False)
    else:
        print("Please provide json file")


if __name__ == "__main__":
    main()
