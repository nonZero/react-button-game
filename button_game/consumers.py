import json
import logging

from channels.generic.websocket import JsonWebsocketConsumer

logger = logging.getLogger(__name__)

foo = []

class GameConsumer(JsonWebsocketConsumer):
    def connect(self):
        self.accept()
        if foo:
            self.other = foo.pop()
            self.other.other = self
        else:
            foo.append(self)
            self.other = None
        logger.warning(f"CONNECT {self.other}")

        self.send_json({'mode': bool(self.other)})

    def disconnect(self, close_code):
        logger.warning("DISCONNECT")

    def receive_json(self, content, **kwargs):
        logger.warning(f"RECIEVE: {content}")

        self.other.send_json({'mode': True})
