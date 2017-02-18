$(function() {

    // ������
    var Player = {
        // ����·��
        path : 'res/music/',

        // ��������
        data : null,

        // ��ǰ���Ÿ����� ����
        currentIndex : -1,

        //  ������Ԫ��jquery����
        $audio : $('audio'),

        // �����б�
        $mList : $('#m-list'),

        //���ڲ��ŵĸ���
        $rmusic : $('#rmusic'),

        // ��ʼ�� ����
        init : function() {

            // ����һ�����Է�������,ͨ��ajax ��������,������ģ��
            Player.data = ['������ - Ing - ������ ����.mp3', '��� - �¸�·�ڼ�.mp3', 'С�� - ����.mp3'];

            // һ����ģ������,������ �� ģ�� ת��Ϊ ��ͼ,����ʾ,������ģ��
            var mhtml = '';
            var len = Player.data.length;
            for (var i = 0; i < len; i++) {
                mhtml += '<li><a index="' + i + '">' + Player.data[i] + '</a></li>';
            }
            Player.$mList.html(mhtml);
        }

        // ����
        ready : function() {
            // ����

            Player.audio = Player.$audio.get(0);

            $('#ctrl-area').on('click', 'button', function() {
                Player.$rmusic.html(Player.data[Player.currentIndex]);
            });

            // ����
            $('#btn-play').click(function() {
                Player.audio.play();
                if (Player.currentIndex == -1) {
                    $('#btn-next').click();
                }
            });

            // ��ͣ
            $('#btn-pause').click(function() {
                Player.audio.pause();
            });

            // ��һ��
            $('#btn-next').click(function() {
                if (Player.currentIndex == -1) {
                    Player.currentIndex = 0;
                } else if (Player.currentIndex == (Player.data.length - 1)) {
                    Player.currentIndex = 0;
                } else {
                    Player.currentIndex++;
                }
                console.log("Player.currentIndex : " + Player.currentIndex);
                Player.audio.src = Player.path + Player.data[Player.currentIndex];
                Player.audio.play();
            });

            // ��һ��
            $('#btn-pre').click(function() {
                if (Player.currentIndex == -1) {
                    Player.currentIndex = 0;
                } else if (Player.currentIndex == 0) {
                    Player.currentIndex = (Player.data.length - 1);
                } else {
                    Player.currentIndex--;
                }
                Player.audio.src = Player.path + Player.data[Player.currentIndex];
                Player.audio.play();
            });

            // ����ѭ��
            $('#btn-loop').click(function() {
                console.log("Player.currentIndex :", Player.currentIndex);
                Player.audio.onended = function() {
                    Player.audio.load();
                    Player.audio.play();
                };
            });

            // ˳�򲥷�
            $('#btn-order').click(function() {
                console.log("Player.currentIndex :", Player.currentIndex);
                Player.audio.onended = function() {
                    $('#btn-next').click();
                };
            });

            // �������
            $('#btn-random').click(function() {
                Player.audio.onended = function() {
                    var i = parseInt((Player.data.length - 1) * Math.random());
                    playByMe(i);
                };
            });

            // ����ָ������
            function playByMe(i) {
                console.log("index:", i);
                Player.audio.src = Player.path + Player.data[i];
                Player.audio.play();
                Player.currentIndex = i;
                Player.$rmusic.html(Player.data[Player.currentIndex]);
            }

            // ���������
            $('#m-list a').click(function() {
                playByMe($(this).attr('index'));
            });
        }
    };

    Player.init();
    Player.ready();

});
