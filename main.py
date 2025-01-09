from PyQt5.QtWidgets import *
from PyQt5 import uic
import os
from fedebom import findFedebom
from azure import authentication

class MyGUI(QMainWindow):
    def __init__(self):
        super(MyGUI, self).__init__()
        ui_path = os.path.join(os.path.dirname(__file__), 'ui', 'testUi.ui')
        uic.loadUi(ui_path, self)
        self.showMaximized()
        self.activateWindow()
        self.raise_()

def main():
    app = QApplication([])
    app.setStyle('Fusion')
    window = MyGUI()
    app.exec_()

if __name__ == '__main__':
    authentication.start()
    main()

