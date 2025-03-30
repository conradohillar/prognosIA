import { StyleSheet, ScrollView, TouchableOpacity, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import Markdown from 'react-native-markdown-display';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import showdown from 'showdown';
import * as FileSystem from 'expo-file-system';
import { useLocalSearchParams } from 'expo-router';

export default function ResultsScreen() {
  const router = useRouter();
  const { answer } = useLocalSearchParams();

  const handleDownload = async () => {
    try {
      // Obtener la fecha actual formateada
      const fecha = new Date().toLocaleDateString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      }).replace(/\//g, '-');

      // Convertir Markdown a HTML
      const converter = new showdown.Converter();
      const html = converter.makeHtml(Array.isArray(answer) ? answer.join('') : answer);

      // Template HTML con estilos
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <title>Reporte Médico - ${fecha}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                padding: 20px;
              }
              h1 {
                color: #222;
                font-size: 24px;
                margin-bottom: 16px;
              }
              h2 {
                color: #333;
                font-size: 20px;
                margin: 12px 0;
              }
              h3 {
                color: #444;
                font-size: 18px;
                margin: 8px 0;
              }
              ul, ol {
                margin: 8px 0;
              }
              li {
                margin: 4px 0;
              }
              strong {
                color: #000;
              }
            </style>
          </head>
          <body>
            ${html}
          </body>
        </html>
      `;

      // Generar PDF
      const { uri } = await Print.printToFileAsync({
        html: htmlContent,
        base64: false
      });

      // Obtener el nombre del archivo con la fecha
      const newPath = `${uri.slice(0, uri.lastIndexOf('/'))}/prognosIA_Reporte${fecha}.pdf`;
      await FileSystem.moveAsync({
        from: uri,
        to: newPath
      });

      // Compartir el archivo PDF
      await Sharing.shareAsync(newPath, {
        mimeType: 'application/pdf',
        dialogTitle: 'Descargar Reporte Médico',
        UTI: 'com.adobe.pdf'
      });

    } catch (error) {
      
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {/* <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.replace('/(tabs)/chat')}
        >
          <FontAwesome5 name="arrow-left" size={20} color="#333" />
        </TouchableOpacity> */}
        <Text style={styles.headerTitle}>Reporte Médico</Text>
      </View>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.contentContainer}>
          <Markdown 
            style={{
              body: styles.markdownBody,
              heading1: styles.heading1,
              heading2: styles.heading2,
              heading3: styles.heading3,
              paragraph: styles.paragraph,
              list: styles.list,
              listItem: styles.listItem,
              strong: styles.strong
            }}
          >
            {answer}
          </Markdown>
        </View>
      </ScrollView>

      <TouchableOpacity 
        style={styles.fab}
        onPress={handleDownload}
      >
        <Text style={styles.fabText}>Descargar archivo</Text>
        <FontAwesome5 name="file-download" size={20} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  scrollContainer: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  markdownBody: {
    color: '#333',
    fontSize: 16,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginVertical: 16,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 12,
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginVertical: 8,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
  },
  list: {
    marginVertical: 8,
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
  },
  strong: {
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#f44',
    width: 210,
    height: 60,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 15,
  }
});
