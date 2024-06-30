const questions = [
            "ما هو أكثر موقف محرج حدث لك في المدرسة، {name}؟",
            "ما هو أسوأ كذبة قلتها لوالديك، {name}؟",
            "ما هو أغرب شيء أكلته على الإطلاق، {name}؟",
            "ما هو أكثر شيء سخيف تخاف منه، {name}؟",
            "ما هو أكثر شيء غير عادي في غرفة نومك، {name}؟",
            "ما هو أسوأ هدية تلقيتها على الإطلاق، {name}؟",
            "ما هو أكثر شيء طفولي ما زلت تفعله، {name}؟",
            "ما هو أغرب حلم رأيته مؤخرًا، {name}؟",
            "ما هو أكثر شيء غريب قمت بشرائه، {name}؟",
            "ما هو أكثر موقف محرج حدث لك في موعد غرامي، {name}؟"
        ];

        const dares = [
            "قم بتقليد صوت حيوان لمدة 30 ثانية، {name}",
            "غنِّ أغنية بصوت عالٍ في الشارع، {name}",
            "اتصل بأحد أصدقائك وأخبره بنكتة سخيفة، {name}",
            "قم بالرقص دون موسيقى لمدة دقيقة كاملة، {name}",
            "تحدث بلهجة غريبة لمدة 5 دقائق، {name}",
            "قم بارتداء ملابسك بالمقلوب لمدة ساعة، {name}",
            "قم بتمثيل مشهد من فيلمك المفضل، {name}",
            "اكتب رسالة حب مضحكة لشخص وهمي، {name}",
            "قم بعمل 10 تمارين ضغط الآن، {name}",
            "قم بتصوير فيديو قصير وأنت ترقص على أغنية مضحكة، {name}"
        ];

        const truthPunishments = [
            "قم بنشر صورة محرجة لك على وسائل التواصل الاجتماعي",
            "اعترف بسر صغير لأحد الموجودين",
            "دع شخصًا آخر يختار صورة الملف الشخصي الخاصة بك لمدة أسبوع",
            "قم بإرسال رسالة نصية محرجة لأحد جهات الاتصال العشوائية",
            "قم بتغيير اسمك على وسائل التواصل الاجتماعي إلى اسم مضحك لمدة يوم",
            "اعترف بأكبر خوف لديك أمام الجميع",
            "قم بإخبار نكتة سيئة وانتظر حتى يضحك شخص ما",
            "قم بالاعتراف بشيء محرج فعلته في الماضي",
            "دع شخصًا آخر يكتب تغريدة نيابة عنك",
            "قم بإظهار آخر 5 صور في هاتفك للجميع"
        ];

        const darePunishments = [
            "قم بتناول ملعقة من صلصة حارة",
            "قم بوضع مكعبات الثلج في ملابسك لمدة 30 ثانية",
            "قم بالمشي حافي القدمين في الخارج لمدة دقيقة",
            "قم بتقليد شخصية كرتونية لمدة 5 دقائق",
            "قم بارتداء ملابسك بالمقلوب لبقية اليوم",
            "قم بالتحدث فقط باستخدام الإيماءات لمدة 10 دقائق",
            "قم بتناول شطيرة بمكونات غريبة من اختيار الآخرين",
            "قم بغناء أغنية أثناء تناول الماء",
            "قم بالتظاهر بأنك تمثال لمدة 3 دقائق في مكان عام",
            "قم بإجراء مكالمة هاتفية مع شخص ما وتحدث فقط بالقوافي"
        ];

        const spinBtn = document.getElementById('spinBtn');
        const cantDoBtn = document.getElementById('cantDoBtn');
        const doneBtn = document.getElementById('doneBtn');
        const resultDiv = document.getElementById('result');
        const challengeDiv = document.getElementById('challenge');
        const punishmentDiv = document.getElementById('punishment');
        const playerNameInput = document.getElementById('playerName');
        const scoreTableBody = document.querySelector('#scoreTable tbody');

        let currentResult = '';

        function updateScore(playerName, points) {
            let playerRow = document.querySelector(`#scoreTable tbody tr[data-player="${playerName}"]`);
            if (!playerRow) {
                playerRow = document.createElement('tr');
                playerRow.setAttribute('data-player', playerName);
                playerRow.innerHTML = `<td>${playerName}</td><td>0</td>`;
                scoreTableBody.appendChild(playerRow);
            }
            let scoreCell = playerRow.querySelector('td:nth-child(2)');
            scoreCell.textContent = parseInt(scoreCell.textContent) + points;
        }

        spinBtn.addEventListener('click', () => {
            const playerName = playerNameInput.value.trim() || 'أنت';
            currentResult = Math.random() < 0.5 ? 'حقيقة' : 'تحدي';
            resultDiv.textContent = `النتيجة: ${currentResult}`;
            
            let challenge = '';
            if (currentResult === 'حقيقة') {
                challenge = questions[Math.floor(Math.random() * questions.length)];
            } else {
                challenge = dares[Math.floor(Math.random() * dares.length)];
            }
            challenge = challenge.replace('{name}', playerName);
            challengeDiv.textContent = challenge;

            doneBtn.style.display = 'block';
            cantDoBtn.style.display = 'block';
            punishmentDiv.textContent = '';
        });

        doneBtn.addEventListener('click', () => {
            const playerName = playerNameInput.value.trim() || 'أنت';
            updateScore(playerName, 2);
            doneBtn.style.display = 'none';
            cantDoBtn.style.display = 'none';
        });

        cantDoBtn.addEventListener('click', () => {
            const playerName = playerNameInput.value.trim() || 'أنت';
            let punishment = '';
            if (currentResult === 'حقيقة') {
                punishment = truthPunishments[Math.floor(Math.random() * truthPunishments.length)];
            } else {
                punishment = darePunishments[Math.floor(Math.random() * darePunishments.length)];
            }
            punishmentDiv.textContent = `العقاب: ${punishment}`;
            
            updateScore(playerName, -1);
            doneBtn.style.display = 'none';
            cantDoBtn.style.display = 'none';
        });
    </script>