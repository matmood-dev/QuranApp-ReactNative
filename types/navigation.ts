export type RootStackParamList = {
  PageView: { pageNumber: number };
  ReciterListScreen: undefined;
  SurahList: undefined;
  MafatihScreen: undefined;
  FullAudioPlayerScreen: {
    surahName: string;
    reciterId: string;
    reciterName: string;
  };
  SurahAudioScreen: {
    reciterId: string;
    reciterName: string;
  };
  PrayerTime: undefined;
  Settings: undefined;
  About: undefined;
  HomeScreen: undefined;
};

export type RootDrawerParamList = {
  Home: undefined;
};