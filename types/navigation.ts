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

  DuasScreen: undefined;
  DuasListScreen: {
    title: string;
    items: {
      title: string;
      icon: string;
      duas: {
        title: string;
        header?: string;
        text?: string;
      }[];
    }[];
  };
  DuaDetailScreen: {
    title: string;
    header?: string;
    text?: string;
  };
};

export type RootDrawerParamList = {
  Home: undefined;
};