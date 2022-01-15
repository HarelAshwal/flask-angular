from multiprocessing import Process
from main import run_main
from gui_starter import start_gui

if __name__ == '__main__':
    p1 = Process(target=run_main)
    p1.start()
    p2 = Process(target=start_gui)
    p2.start()
        
    
