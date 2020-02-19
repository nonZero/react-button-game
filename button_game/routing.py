from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path

from . import consumers

application = ProtocolTypeRouter({
    # (http->django views is added by default)
    'websocket':
        URLRouter([
            path('ws/game1/', consumers.GameConsumer),
        ])
})
