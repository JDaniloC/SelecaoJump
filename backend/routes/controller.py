import pm4py
import pandas

class Core:
    def __init__(self) -> None:
        self.log = None

    def load_log_data(self, file_path):
        """ Loads the csv in file_path into an event_log. """
        columns_to_datetime = ['Start', 'End']
        dtypes = {"Case": str}
        df = pandas.read_csv(file_path, encoding = "utf-8", sep=';', parse_dates=columns_to_datetime, dtype=dtypes)
        df = pm4py.format_dataframe(df, case_id="Case", activity_key="ActivityCode", timestamp_key="End", start_timestamp_key="Start")
        self.log = pm4py.convert_to_event_log(df)

core_instance = Core()

def get_core():
    return core_instance