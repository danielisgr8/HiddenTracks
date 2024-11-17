plugins {
    id("software.amazon.smithy").version("0.7.0")
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("software.amazon.smithy:smithy-model:1.47.0")
    implementation("software.amazon.smithy.typescript:smithy-typescript-codegen:0.19.0")
    implementation("software.amazon.smithy:smithy-aws-traits:1.47.0")
    implementation("software.amazon.smithy:smithy-validation-model:1.47.0")
}

configure<software.amazon.smithy.gradle.SmithyExtension> {
    // projection = "foo"
}

buildscript {
    dependencies {
        classpath("software.amazon.smithy.typescript:smithy-aws-typescript-codegen:0.19.0")
    }
}

tasks["jar"].enabled = false

val javaScriptClientDirectory = "build/smithyprojections/model/source/typescript-codegen"
tasks.register<Exec>("npmInstallClient") {
    dependsOn("smithyBuildJar")
    inputs.files(fileTree(javaScriptClientDirectory) {
        include("package.json")
    })
    outputs.files(fileTree(javaScriptClientDirectory) {
        include("package-lock.json")
        include("node_modules/**")
    })

    workingDir(javaScriptClientDirectory)
    commandLine("npm", "install")
}
tasks.register<Exec>("npmBuildClient") {
    dependsOn("npmInstallClient")
    inputs.files(fileTree(javaScriptClientDirectory) {
        exclude("dist-*/**")
    })
    outputs.files(fileTree(javaScriptClientDirectory) {
        include("dist-*/**")
    })

    workingDir(javaScriptClientDirectory)
    commandLine("npm", "run", "build")
}

val javaScriptServerDirectory = "build/smithyprojections/model/source/typescript-ssdk-codegen"
tasks.register<Exec>("npmInstallServer") {
    dependsOn("smithyBuildJar")
    inputs.files(fileTree(javaScriptServerDirectory) {
        include("package.json")
    })
    outputs.files(fileTree(javaScriptServerDirectory) {
        include("package-lock.json")
        include("node_modules/**")
    })

    workingDir(javaScriptServerDirectory)
    commandLine("npm", "install")
}
tasks.register<Exec>("npmBuildServer") {
    dependsOn("npmInstallServer")
    inputs.files(fileTree(javaScriptServerDirectory) {
        exclude("dist-*/**")
    })
    outputs.files(fileTree(javaScriptServerDirectory) {
        include("dist-*/**")
    })

    workingDir(javaScriptServerDirectory)
    commandLine("npm", "run", "build")
}

tasks.build {
    dependsOn("npmBuildClient", "npmBuildServer")
}
