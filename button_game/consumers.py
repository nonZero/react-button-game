import logging

from channels.generic.websocket import JsonWebsocketConsumer, WebsocketConsumer

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


class RecordAudioConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.buf = []

    def receive(self, text_data=None, bytes_data=None):
        logger.warning(f"RECIEVE: {len(bytes_data or [])=} {len(text_data or [])=}")
        if text_data:
            logger.warning(f"RECIEVE TEXT: {text_data!r}")
        if bytes_data:
            self.buf.append(bytes_data)

    def disconnect(self, close_code):
        logger.warning("DISCONNECT")
        with open("demo.webm", "wb") as f:
            for b in self.buf:
                f.write(b)
        del self.buf
        logger.warning("SAVED")


class PlayAudioConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        with open("music.webm", "rb") as f:
            self.buf = f.read()
        size = 6400
        for i in range(0, len(self.buf), size):
            self.send(bytes_data=self.buf[i:i + size])
            break

    def disconnect(self, close_code):
        logger.warning("DISCONNECT")

    def receive_json(self, content, **kwargs):
        logger.warning(f"RECIEVE: {content}")
