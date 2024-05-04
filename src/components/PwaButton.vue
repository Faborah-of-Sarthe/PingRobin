<template>
    <div class="flex mt-4 justify-center">
        <button  class="btn btn-wide" v-if="showInstallButton" @click="installPWA">Installer sur l'appareil ?</button>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const showInstallButton = ref(false);
let installPromptEvent = null;

const handleInstallPrompt = (event) => {
    event.preventDefault();
    showInstallButton.value = true;
    installPromptEvent = event;
};

const installPWA = () => {
    if (installPromptEvent) {
        installPromptEvent.prompt();
        installPromptEvent.userChoice.then(choiceResult => {
            if (choiceResult.outcome === 'accepted') {
                console.log('L\'application a été installée avec succès');
            } else {
                console.log('L\'installation de l\'application a été annulée');
            }
            showInstallButton.value = false;
            installPromptEvent = null;
        });
    }
};

onMounted(() => {
    window.addEventListener('beforeinstallprompt', handleInstallPrompt);
});

onBeforeUnmount(() => {
    window.removeEventListener('beforeinstallprompt', handleInstallPrompt);
});


</script>