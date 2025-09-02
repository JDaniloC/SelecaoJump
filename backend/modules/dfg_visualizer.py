from utils import dfg_visualizer
import pm4py

def generate_svg(eventlog):
    frequency_dfg, start_act_freq, end_act_freq = pm4py.discover_dfg(eventlog)
    return dfg_visualizer(
        frequency_dfg, eventlog,
        start_act_freq, end_act_freq
    ).render()