from PyQt5.QtWidgets import *
from PyQt5 import uic
import os
from fedebom import findFedebom

class MyGUI(QMainWindow):
    def __init__(self):
        super(MyGUI, self).__init__()
        ui_path = os.path.join(os.path.dirname(__file__), 'ui', 'testUi.ui')
        print(ui_path)
        uic.loadUi(ui_path, self)
        self.show()

def main():
    app = QApplication([])
    window = MyGUI()
    app.exec_()

if __name__ == '__main__':
    main()

