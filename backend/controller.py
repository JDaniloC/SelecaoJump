import pm4py

class Core:
    def __init__(self) -> None:
        self.log = None

    def load_log_data(self, file_path):
        """ Loads the csv in file_path into an event_log. """
        self.log = pm4py.read_ocel_csv(file_path)

core_instance = Core()

def get_core():
    return core_instance