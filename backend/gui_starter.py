import webview

def start_gui():    
    window = webview.create_window('MALI bringup', 'http://localhost:5000/')
    webview.start()

if __name__ == "__main__":
    start_gui()
