subprojects {
    group = "com.marisarichmond"
    version = "0.0.1-SNAPSHOT"

    repositories {
        mavenLocal()
        mavenCentral()
    }
}

repositories {
    mavenCentral()
}

gradle.BuildResult {
    delete(project.buildDir)
}
